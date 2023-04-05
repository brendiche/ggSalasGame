export class Base {
  protected element: HTMLElement;

  addClass(className: string): void {
    this.element.className += ` ${className}`;
  }

  removeClass(className: string): void {
    this.element.className = this.element.className.split(` ${className}`).join('');
  }

  destroy(){
    this.element.remove();
  }
}
