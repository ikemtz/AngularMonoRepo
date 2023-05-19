import 'jest-preset-angular/setup-jest';
import '@angular/localize/init';

import { TextEncoder, TextDecoder } from 'util';
Object.assign(global, { TextDecoder, TextEncoder });
