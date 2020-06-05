import Shell from "node-powershell";
import { EventEmitter } from "events";
import { spawn } from "child_process";

const initializeShell = () => new Shell({
    executionPolicy: 'Bypass',
    noProfile: true
});

export const executer = (commande: string, args: string[], powershell: boolean = true) => new Promise<string>((resolve, reject) => {
    const opts = powershell ? { shell: "powershell.exe" } : undefined;
    const process = spawn(commande, args, opts);
    let result = "";
    process.stdout.on("data", v => result += v);
    process.stderr.on("error", reject);
    process.on("close", () => resolve(result));
});

export const stream = (commande: string, args: string[], powershell: boolean = true) => {
    const readStream = new EventEmitter();
    const ps = initializeShell();
    const close = () => {
        ps.dispose();
        readStream.emit('end');
    };
    ps.addCommand(commande);
    ps.on('output', data => {
        readStream.emit('data', data);
    });
    ps.on('err', data => readStream.emit('error', data));
    ps.on('end', _ => close());
    ps.invoke();
    return readStream;
}
