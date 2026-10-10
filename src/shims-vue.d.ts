/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue-router' {
  export type RouteRecordRaw = any;
  export interface RouteLocationNormalizedLoaded {
    path: string;
    params: Record<string, string>;
    query: Record<string, string>;
    name?: string;
    [key: string]: any;
  }
  export interface Router {
    install(app: any, ...options: any[]): any;
    push(to: any): Promise<any>;
    replace(to: any): Promise<any>;
    back(): void;
    forward(): void;
    go(delta: number): void;
    currentRoute: any;
  }
  export function createRouter(options: any): Router;
  export function createWebHashHistory(base?: string): any;
  export function createWebHistory(base?: string): any;
  export function useRoute(): RouteLocationNormalizedLoaded;
  export function useRouter(): Router;
  export const RouterView: any;
  export const RouterLink: any;
}

