import { RoleClass } from '../libs/actors_and_roles';

export const onPulseTick = new RoleClass(Symbol('onPulseTick'));

export const onResize = new RoleClass(Symbol('onResize'));

export const followMouse = new RoleClass(Symbol('followMouse'));

export const stopDrag = new RoleClass(Symbol('stopDrag'));
