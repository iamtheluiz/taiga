import path from 'path'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import { executeCommand } from '../utils/executeCommand';

const executablePath =
  process.env.NODE_ENV === 'production'
    ? path.join(__dirname, 'TaigaRecognition', 'TaigaRecognition.exe')
    : path.join(__dirname, '..', '..', 'TaigaRecognition', 'bin', 'Release', 'net6.0', 'TaigaRecognition.exe')

export class Recognition {
  static ipc: ChildProcessWithoutNullStreams | null = null;
  static isRecognizing: boolean = false;
  
  static startRecognition() {
    this.ipc = spawn(executablePath)
    this.ipc.stdin.setDefaultEncoding("utf8")

    this.ipc.stdout.on('data', (data) => {
      const out = data.toString().split('Recognized text: ')[1].replace(/(\r\n|\n|\r)/gm, "");
      console.log(`You: ${out}`);

      executeCommand(out)
    });

    this.isRecognizing = true
  }

  static stopRecognition() {
    this.ipc?.kill();
    this.ipc = null;
  
    this.isRecognizing = false
  }

  static resetRecognition() {
    this.stopRecognition();
    this.startRecognition();
  }
}