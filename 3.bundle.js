(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{35:function(e,t,a){"use strict";a.r(t);var n=a(8),l=a.n(n),s=a(3),r=a.n(s),i=a(4),o=a.n(i),c=a(5),h=a.n(c),u=a(6),p=a.n(u),d=a(7),v=a.n(d),f=a(0),b=a(1),m=f.createElement,x=function(e){function t(e){var a;r()(this,t);var n=(a=h()(this,p()(t).call(this,e))).props,l=n.value,s=n.label;return a.state={value:"true"===l||!0===l,labelText:s&&s.text},a}return v()(t,e),o()(t,[{key:"shouldComponentUpdate",value:function(e,t){return this.props.innerRef!==e.innerRef||this.props.value!==e.value||this.state.value!==t.value||this.props.style!==e.style||!(!e.label||this.state.labelText===e.label.text)}},{key:"componentDidUpdate",value:function(e){var t=this.props.label;e.label&&e.label.text!==t.text&&this.setState({labelText:t&&t.text})}},{key:"onChange",value:function(e){this.setState({value:e.target.checked}),this.props.onUpdate({target:{name:this.props.name,value:e.target.checked}})}},{key:"render",value:function(){var e=this,t=this.props,a=t.className,n=t.style,l=t.label,s=t.name,r=t.customSvg,i=t.innerRef,o=this.state.value,c=r?r.svgProps:{width:24,height:24,viewBox:"0 0 24 24"},h=r?r.forTrue:m("path",{className:"int",d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),u=r?r.forFalse:m("rect",{className:"ext",style:{fill:"#fff",strokeWidth:2,stroke:"#d8d8df",borderRadius:2},width:16,height:16,rx:2,ry:2,x:4,y:4});return m("div",{className:Object(b.j)(["container-field",void 0===a?"check":a]),style:n},m("input",{ref:i,type:"checkbox",name:s,id:s,checked:o,onChange:function(t){e.onChange(t)}}),m("label",{htmlFor:s,style:l&&l.style},m("svg",c,!0===o?h:u),m("div",{},Object(b.a)(l&&l.text,s))))}}]),t}(f.Component);t.default=Object(f.forwardRef)(function(e,t){return m(x,l()({},e,{innerRef:t}))})}}]);