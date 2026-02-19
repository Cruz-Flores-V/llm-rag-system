---
name: create-module
description: Creates a NestJS module with its controller and service. The service must be imported in the controller, and both must have a method called `getHello` that returns a string. The controller method must have the appropriate decorator, and the controller route must be the plural of the module name.
---

`${input:moduleName: enter the module name}`

- avoid using `npx`, assume the user has the NestJS CLI installed globally
- if it's not installed (you'll know if an error is generated when executing it), ask the user if they want to install it with the command `npm i -g @nestjs/cli`
- create a NestJS module with the command `nest g mo ${moduleName}`
- create a NestJS controller with the command `nest g co ${moduleName} --no-spec`
- create a NestJS service with the command `nest g s ${moduleName}/services/${moduleName} --no-spec --flat`
- import the service in the controller
- add a method called `getHello` in the service that returns a string
- add a method called `getHello` in the controller that returns the result of the service
- add the appropriate decorator to the controller method
- the controller route must be the plural of the module name, example:

