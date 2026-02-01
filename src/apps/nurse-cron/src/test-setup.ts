import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
setupZoneTestEnv();
import '@angular/localize/init';

import { TextEncoder, TextDecoder } from 'node:util';
Object.assign(global, { TextDecoder, TextEncoder });
