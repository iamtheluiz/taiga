import path from 'path'
import { spawn } from 'child_process'
import { executeCommand } from './utils/executeCommand'

// Taiga Recognition
const executablePath =
  process.env.NODE_ENV === 'production'
    ? path.join(__dirname, 'TaigaRecognition', 'TaigaRecognition.exe')
    : path.join(__dirname, '..', '..', 'TaigaRecognition', 'bin', 'Release', 'net6.0', 'TaigaRecognition.exe')

export const ipc = spawn(executablePath)
ipc.stdin.setDefaultEncoding("utf8")

ipc.stdout.on('data', function (data) {
  const out = data.toString().split('Recognized text: ')[1].replace(/(\r\n|\n|\r)/gm, "");
  console.log(`You: ${out}`);

  executeCommand(out)
});