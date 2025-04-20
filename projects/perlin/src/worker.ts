// import { Vec2 } from "vecs-ts";
// import { PerlinNoise } from "./utils/perlin";

// export type WorkerRequest = {
//     type: "create",
//     data: ImageData,
//     canvas: {
//         width: number,
//         height: number
//     }
// }
// export type WorkerResponse = {
//     type: "create",
//     status: "succeed",
//     data: ImageData
// } | {
//     type: "create",
//     status: "failed",
//     message: string
// } | {
//     type: "create",
//     status: "in-progress",
//     progress: number
// }

// self.onmessage = eventData => {
//     const receivedData = eventData.data as WorkerRequest;

//     if (receivedData.type !== "create") return;

//     const imageData = receivedData.data;
//     const canvas = receivedData.canvas;

//     let isDrawing = false;
//     if (isDrawing) {
//         self.postMessage({
//             type: "create",
//             status: "failed",
//             message: "Drawing is already in progress."
//         } satisfies WorkerResponse);
//         return;
//     }
//     isDrawing = true;
//     const data = imageData.data;


//     let progress = 0;


//     let interval = setInterval(() => {
//         self.postMessage({
//             type: "create",
//             status: "in-progress",
//             progress
//         } satisfies WorkerResponse);
//     }, 1000);

//     for (let i = 0; i < data.length / 4; i++) {
//         const pixelLocation = new Vec2(i % canvas.width, Math.floor(i / canvas.width));
//         const location = new Vec2(
//             (2 * pixelLocation.x - canvas.width) / canvas.height,
//             (2 * pixelLocation.y - canvas.height) / canvas.height
//         );

//         location.mulScalar(5); // Scale the coordinates to control the frequency of the noise

//         const noiseValue = PerlinNoise.fbm2D(location, 0, 8, 0.5, 2);

//         const colorValue = Math.min(255, Math.max(0, (noiseValue / 2 + 0.5) * 255));
//         data[i * 4] = colorValue;     // Red
//         data[i * 4 + 1] = colorValue; // Green
//         data[i * 4 + 2] = colorValue; // Blue
//         data[i * 4 + 3] = 255;        // Alpha

//         progress = i / data.length * 4;
//     }

//     clearInterval(interval);

//     self.postMessage({
//         type: "create",
//         status: "succeed",
//         data: imageData
//     } satisfies WorkerResponse);
// }

// worker.js

import { Vec2 } from "vecs-ts";
import { PerlinNoise } from "./utils/perlin"; // 경로가 올바른지 확인하세요.

// 타입 정의 (JavaScript 런타임에는 영향을 미치지 않으며, TypeScript 사용 시 유용합니다)
export type WorkerRequest = {
    type: "create",
    data: ImageData,
    canvas: {
        width: number,
        height: number
    },
    seed?: number,
    scale?: number,
    octaves?: number,
    persistence?: number,
    lacunarity?: number
}
export type WorkerResponse = {
    type: "create",
    status: "succeed",
    data: ImageData
} | {
    type: "create",
    status: "failed",
    message: string
} | {
    type: "create",
    status: "in-progress",
    progress: number // 0.0에서 1.0 사이 값
} | {
    type: "create",
    status: "cancelled",
    message: string
};


// ======================================================
// 전역 설정 변수
// ======================================================
// 진행 상황 보고 간격 (밀리초) - 0.25초마다 보고
const REPORT_INTERVAL_MS = 250;

// 한 번에 처리할 픽셀 단위 (청크 크기) - 이 값을 조절하여 performChunk 호출 빈도를 제어합니다.
// 브라우저가 멈추지 않으면서 효율적인 값으로 테스트를 통해 결정하는 것이 좋습니다.
const CHUNK_SIZE = 10000; // 예시 값


// ======================================================
// 워커 상태 변수
// ======================================================
let _imageData: ImageData | null = null;
let _canvas: { width: number, height: number } | null = null;
let _currentPixelIndex = 0; // 현재까지 처리한 픽셀 수
let _totalPixels = 0;      // 전체 픽셀 수
let _currentIntervalId: NodeJS.Timeout | null = null; // setInterval ID
let _isDrawing = false;    // 현재 작업 진행 중인지 나타내는 플래그
let _isCancelled = false;  // 작업 취소 요청 플래그
let _seed = 0;
let _scale = 1;
let _octaves = 4;
let _persistence = 0.5;
let _lacunarity = 2.0;


// ======================================================
// 진행 상황 보고 함수 (타이머에 의해 주기적으로 호출됨)
// ======================================================
function reportProgress() {
    // 작업 중이거나 취소되지 않았을 때만 보고
    if (!_isDrawing || _isCancelled || _totalPixels === 0) {
        return;
    }

    const progress = _currentPixelIndex / _totalPixels;

    self.postMessage({
        type: "create",
        status: "in-progress",
        progress: progress
    } satisfies WorkerResponse);

    // console.log(`Worker reporting progress: ${Math.round(progress * 100)}%`);
}


// ======================================================
// 무거운 작업을 청크 단위로 수행하는 함수
// ======================================================
function performChunk() {
    // 작업 취소 또는 완료 상태면 중단
    if (!_isDrawing || _isCancelled) {
        console.log('Worker task stopped (cancelled or already finished).');
        return;
    }

    const data = (_imageData as ImageData).data; // 타입 캐스팅 (TypeScript 환경에서 필요)
    const width = (_canvas as { width: number, height: number }).width;
    const height = (_canvas as { width: number, height: number }).height;

    const start = _currentPixelIndex;
    const end = Math.min(_currentPixelIndex + CHUNK_SIZE, _totalPixels);

    // 현재 청크 작업 수행
    for (let i = start; i < end; i++) {
        // 취소 요청이 들어오면 즉시 중단
        if (_isCancelled) {
            console.log('Worker task cancelled during chunk processing.');
            break; // 현재 청크 처리 중단
        }

        const pixelLocation = new Vec2(i % width, Math.floor(i / width));
        const location = new Vec2(
            (2 * pixelLocation.x - width) / height,
            (2 * pixelLocation.y - height) / height
        );

        location.mulScalar(_scale); // Scale the coordinates

        const noiseValue = PerlinNoise.fbm2D(location, _seed, _octaves, _persistence, _lacunarity);

        const colorValue = Math.min(255, Math.max(0, (noiseValue / 2 + 0.5) * 255));

        const dataIndex = i * 4;
        data[dataIndex] = colorValue;     // Red
        data[dataIndex + 1] = colorValue; // Green
        data[dataIndex + 2] = colorValue; // Blue
        data[dataIndex + 3] = 255;        // Alpha
    }

    _currentPixelIndex = end; // 처리된 픽셀 수 업데이트

    // 청크 처리 후 진행 상황 보고 (타이머와는 별개로 청크 완료 시점에도 보고 가능)
    // reportProgress(); // 매 청크마다 보고하고 싶다면 이 주석을 해제하세요.

    if (_isCancelled) {
        // 청크 처리 중 취소된 경우
        cleanupTask();
        self.postMessage({
            type: "create",
            status: "cancelled",
            message: "Task was cancelled."
        } satisfies WorkerResponse);
    } else if (_currentPixelIndex < _totalPixels) {
        // 아직 작업이 남았다면, 다음 청크를 이벤트 루프의 끝에 예약
        // setTimeout(performChunk, 0)을 사용하여 워커가 잠시 다른 이벤트(보고 타이머 등)를 처리할 기회를 줌
        setTimeout(performChunk, 0);
    } else {
        // 작업 완료
        console.log('Worker task completed successfully.');
        // 최종 결과 보고
        self.postMessage({
            type: "create",
            status: "succeed",
            data: _imageData as ImageData // 최종 ImageData 전송
        } satisfies WorkerResponse);
        cleanupTask();
    }
}

// ======================================================
// 작업 정리 함수
// ======================================================
function cleanupTask() {
    _isDrawing = false;
    _isCancelled = false;
    _imageData = null;
    _canvas = null;
    _currentPixelIndex = 0;
    _totalPixels = 0;
    _seed = Math.floor(Math.random() * 1000000); // 새로운 시드 생성 (다음 작업을 위해)

    if (_currentIntervalId !== null) {
        clearInterval(_currentIntervalId);
        _currentIntervalId = null;
        console.log('Progress reporting timer stopped.');
    }
}


// ======================================================
// 메인 스레드로부터 메시지 수신
// ======================================================
self.onmessage = eventData => {
    const receivedData = eventData.data as WorkerRequest; // 타입 캐스팅

    if (receivedData.type === "create") {
        // 이미 작업 중이면 요청 무시 또는 실패 보고
        if (_isDrawing) {
            self.postMessage({
                type: "create",
                status: "failed",
                message: "Drawing is already in progress."
            } satisfies WorkerResponse);
            return;
        }

        console.log('Worker received create task.');
        // 작업 상태 초기화 및 시작 준비
        _isDrawing = true;
        _isCancelled = false; // 새로운 작업 시작 시 취소 플래그 초기화
        _imageData = receivedData.data;
        _canvas = receivedData.canvas;
        _currentPixelIndex = 0;
        _totalPixels = _imageData.data.length / 4; // 픽셀 수 계산

        // 빈 데이터 예외 처리
        if (_totalPixels === 0) {
            console.log('Worker received empty image data.');
            self.postMessage({
                type: "create",
                status: "succeed",
                data: _imageData
            } satisfies WorkerResponse);
            cleanupTask(); // 상태 정리
            return;
        }

        // 진행 상황 보고 타이머 설정 (작업 시작 전)
        // 이미 타이머가 실행 중이면 새로 설정하지 않음 (다중 메시지 방지)
        if (_currentIntervalId === null) {
            _currentIntervalId = setInterval(reportProgress, REPORT_INTERVAL_MS);
            console.log(`Progress reporting timer started (${REPORT_INTERVAL_MS}ms interval).`);
        }


        // 첫 번째 청크 처리 시작
        console.log('Worker starting first chunk processing.');
        if (receivedData.seed !== undefined) {
            _seed = receivedData.seed; // 시드 설정 (기본값 0)
        }
        if (receivedData.scale !== undefined) {
            _scale = receivedData.scale; // 스케일 설정 (기본값 1)
        }
        if (receivedData.octaves !== undefined) {
            _octaves = receivedData.octaves; // 옥타브 설정 (기본값 4)
        }
        if (receivedData.persistence !== undefined) {
            _persistence = receivedData.persistence; // 지속성 설정 (기본값 0.5)
        }
        if (receivedData.lacunarity !== undefined) {
            _lacunarity = receivedData.lacunarity; // 라쿠나리티 설정 (기본값 2.0)
        }
        performChunk();

    } else if (receivedData.type === "cancel") {
        // 작업 취소 요청 처리 (만약 메인 스레드에서 취소 메시지를 보낸다면)
        if (_isDrawing && !_isCancelled) {
            console.log('Worker received cancel request.');
            _isCancelled = true; // 취소 플래그 설정
            // performChunk 내부 루프 또는 다음 setTimeout 호출에서 이 플래그를 확인하여 중단됩니다.
            // 즉시 중단되지 않고 현재 청크가 완료될 때까지 기다릴 수 있습니다.
        } else {
            console.log('Worker received cancel request, but no task is active.');
        }

    } else {
        // 알 수 없는 메시지 타입
        console.warn('Worker received unknown message type:', receivedData);
    }
};

console.log('Worker script loaded.'); // 워커 스크립트 로딩 확인용