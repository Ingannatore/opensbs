import ModuleTemplateModel from './module-template.model';

export default interface EntityModuleModel {
    id: string,
    type: string,
    template: ModuleTemplateModel,
}
