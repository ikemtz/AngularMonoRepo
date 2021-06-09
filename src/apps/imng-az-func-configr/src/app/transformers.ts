import { IAzSetting, ILocalSetting } from './az-setting.model';

export interface ITransformer {
    icon: string;
    name: string;
    id: number;
    convert(data: IAzSetting[]): ILocalSetting | string;
}
export const initialFunctionDevSettings = (): ILocalSetting => ({ IsEncrypted: false, Values: {} });
export const AzFunc: ITransformer = {
    // eslint-disable-next-line max-len
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

    icon: '//4.bp.blogspot.com/-BmgLupDPg-s/V-cGGu3UiwI/AAAAAAAAL70/m4SD_XfwO-Y4Z4n_55ZqrsXfFLa2slzTwCEw/s1600/Azure%2BApp%2BService%2B-%2BWeb%2BApp%2B%2528was%2BWebsites%2529.png',
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
