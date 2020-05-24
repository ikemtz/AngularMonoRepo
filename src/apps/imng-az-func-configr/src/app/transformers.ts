import { IAzSetting, ILocalSetting } from './az-setting.model';

export interface ITransformer {
    icon: string,
    name: string,
    id: number,
    convert(data: IAzSetting[]): ILocalSetting | string;
}
export const initialFunctionDevSettings = (): ILocalSetting => ({ IsEncrypted: false, Values: {} });
export const AzFunc: ITransformer = {
    icon: '//raw.githubusercontent.com/Azure/azure-functions-cli/master/src/Azure.Functions.Cli/npm/assets/azure-functions-logo-color-raster.png',
    name: 'AZ Function',
    id: 1,
    convert: data => {
        const devSettings = initialFunctionDevSettings();
        if (Array.isArray(data)) {
            data
                .map(t => ({ name: t.name, value: t.value }))
                .forEach(t => {
                    devSettings.Values[t.name] = t.value;
                });
        }
        return devSettings;
    }
};

export const AzWebApp: ITransformer = {
    icon: '//symbols.getvecta.com/stencil_28/5_app-service-web-app.b546381f60.png',
    name: 'AZ WebApp',
    id: 2,
    convert: data => {
        const devSettings = {};
        if (Array.isArray(data)) {
            data
                .map(t => ({ name: t.name, value: t.value }))
                .forEach(t => {
                    devSettings[t.name] = t.value;
                });
        }
        return devSettings;
    }
};

export const DockerEnv: ITransformer = {
    icon: '//www.docker.com/sites/default/files/d8/2019-07/Moby-logo.png',
    name: 'Docker Environment',
    id: 3,
    convert: data => Array.isArray(data) ? data.map(t => `${t.name}=${t.value}`).join('\n\r') : ''
};

export const transformers: ITransformer[] = [AzFunc, AzWebApp, DockerEnv];
