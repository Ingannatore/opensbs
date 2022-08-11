import ModuleTemplate from './moduleTemplate';

export default interface EntityModule {
    id: string,
    type: string,
    template: ModuleTemplate,
}
