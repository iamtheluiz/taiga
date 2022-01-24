import path from 'path'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import { executeCommand } from './utils/executeCommand'

// Taiga Recognition
const executablePath =
  process.env.NODE_ENV === 'production'
    ? path.join(__dirname, 'TaigaRecognition', 'TaigaRecognition.exe')
    : path.join(__dirname, '..', '..', 'TaigaRecognition', 'bin', 'Release', 'net6.0', 'TaigaRecognition.exe')

let ipc: ChildProcessWithoutNullStreams | null = null;
export let isRecognizing = false;

export function startRecognition() {
  ipc = spawn(executablePath)
  ipc.stdin.setDefaultEncoding("utf8")

  ipc.stdout.on('data', function (data) {
    const out = data.toString().split('Recognized text: ')[1].replace(/(\r\n|\n|\r)/gm, "");
    console.log(`You: ${out}`);

    executeCommand(out)
  });

  isRecognizing = true
}

export function stopRecognition() {
  ipc?.kill();
  ipc = null;

  isRecognizing = false
}

export function resetRecognition() {
  stopRecognition();
  startRecognition();
}