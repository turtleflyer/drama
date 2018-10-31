import { RoleClass } from '../libs/actors_and_roles';

export const pulse = new RoleClass(Symbol('pulse'));
export const followMouse = new RoleClass(Symbol('followMouse'));
export const onPulseTick = new RoleClass(Symbol('onPulseTick'));
