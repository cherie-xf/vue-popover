import Popover from './components/vu-popover.vue'
import Vue from 'vue'
const INSTANCENAME = 'popover_instance';
Vue.directive('popover', {
    bind: function (el, binding, vnode) {
        addComponent(el, binding, vnode);
    },
    update: (el, binding, vnode) => {
        if (binding.value !== binding.oldValue) {
            addComponent(el, binding, vnode);
        }

    },
    unbind: (el) => {
        let popoverInstance = el[INSTANCENAME];
        if (popoverInstance) {
            popoverInstance.$destroy();
            delete el[INSTANCENAME];
        }
        removeEvents(el);
    }

});

function addComponent(el, binding, vnode) {
    var vuPopover = Vue.extend(Popover);
    if (binding.value && binding.value.trigger === undefined) {
        binding.value.trigger = false;
    }
    var popoverInstance = new vuPopover({
        propsData: {
            target: el,
            title: binding.value && binding.value.title && binding.value.title.toString(),
            content: binding.value && binding.value.content && binding.value.content.toString(),
            trigger: binding.value && binding.value.trigger,
        }
    });
    el[INSTANCENAME] = popoverInstance;
    var dom = vnode.context.$refs.container
    popoverInstance.$props.content = dom.innerHTML;
    // const node = popoverInstance.$createElement('div', ['Hello']);
    // popoverInstance.$slots.default = [node];

    popoverInstance.$mount();
    el.appendChild(popoverInstance.$el);
    addEvents(el, binding);

}

function addEvents(el) {
    el.addEventListener('mouseenter', function () {
        el[INSTANCENAME].$props.trigger = true;
        el.classList.add("popover-show");
    });
    el.addEventListener('mouseleave', function () {
        el[INSTANCENAME].$props.trigger = false;
        el.classList.remove("popover-show");
    });
}

function removeEvents(el) {
    el.removeEventListener('mouseenter', null);
    el.removeEventListener('mouseleave', null);
}
