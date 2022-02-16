import app from "./app";
import appActionType from "./app/action-type";

const _modules = [{ name: "app", module: app, actions: appActionType }];

const modules = {};
const actions = {};

// Create namespace modules for named actions like app/SET_INFO, etc.
_modules.forEach((module) => {
  modules[module.name] = module.module;

  const moduleActions = {};
  Object.entries(module.actions).forEach(([key, value]) => {
    moduleActions[key] = `${module.name}/${value}`;
  });

  actions[module.name] = moduleActions;
});

export { actions };

export default modules;
