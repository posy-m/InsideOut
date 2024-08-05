import { Injectable } from '@nestjs/common';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptionsFactory } from '@nestjs/platform-express';

@Injectable()
export class UploadService implements MulterOptionsFactory {
    dirPath: string;
    constructor() {
        this.dirPath = path.join(process.cwd(), 'uploads');
        this.mkdir();
        this.createMulterOptions();
    }

    mkdir() {
        try {
            fs.readdirSync(this.dirPath);
        } catch (err) {
            fs.mkdirSync(this.dirPath);
        }
    }

    createMulterOptions() {
        const dirPath = this.dirPath;
        const option = {
            storage: multer.diskStorage({
                destination(req, file, done) {
                    done(null, dirPath);
                },

                filename(req, file, done) {
                    const ext = path.extname(file.originalname);
                    const name = path.basename(file.originalname, ext);
                    done(null, `${name}_${Date.now()}${ext}`);
                },
            }),
            limits: { fileSize: 10 * 1024 * 1024 },
        };
        return option;
    }
}