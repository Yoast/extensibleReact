# extensibleReact

Note, this is a proof of concept (PoC). Not intended for use in a real world project!

API for extending React components. The main function is `extendComponent`, a simple [higher order function / component](https://facebook.github.io/react/docs/higher-order-components.html) which allows people to extend a component in one of the following ways:

- `insertBeforeComponent` allows you to insert a component before the extensible component.
- `insertAfterComponent` allows you to insert a component after the extensible component.
- `replaceComponent` allows you to replace the extensible component with your own component.
- `removeComponent` allows you to remove the extensible component.

Please take a look at [index.js]() to see how simple it is to implement this.

The aim of this PoC is to help strengthen the case for introducing React (or at least JSX) to WordPress core JavaScript. A React based system makes it incredibly easy to make an API like this. Not only does React make this easy. Because of everything being JavaScript, we also have complete control over the components and the ways in which components can be extended. This gives us much needed possibilities:

- When a component is removed, we can render a nullComponent in its place, showing what was removed and by who.
- When a component gets replaced, we can ensure it is replaced by something with the same type, for example `react.component` or `string`.
- [Not included in PoC] We could ensure a component only gets replaced with a component that has the same interface in terms of props. For example, we could decide we want props required by the extensible component to also be required by the replacement component. React makes this easy.
