/**
 * v-popover directive
 * - this directive will create vu-popover component Instance programmatically
 * - looking for [data-name="popover-content"] to set the vu-popover component Slot (!important)
 * - popover trigger events binds in
 */
import Popover from './components/vu-popover.vue'
import Vue from 'vue'
const INSTANCENAME = 'popover_instance';
const HIDETIMEOUT = 500;
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
    var popoverContentElm = el.querySelectorAll('[data-name="popover-content"]')[0];
    popoverContentElm.style.display = "none";
    var vuPopover = Vue.extend(Popover);
    if (binding.value && binding.value.trigger === undefined) {
        binding.value.trigger = false;
    }
    var popoverInstance = new vuPopover({
        propsData: {
            target: el,
            title: binding.value && binding.value.title && binding.value.title.toString(),
            trigger: binding.value && binding.value.trigger,
        }
    });
    el[INSTANCENAME] = popoverInstance;
    const node = vnode.children[1];
    popoverInstance.$slots.default = [node];
    popoverInstance.$mount();
    el.appendChild(popoverInstance.$el);
    addEvents(el, binding);
}

function addEvents(el) {
    el.addEventListener('mouseenter', function () {
        if (el[INSTANCENAME].$data.timeoutId > 0) {
            clearTimeout(el[INSTANCENAME].$data.timeoutId)
            el[INSTANCENAME].$data.timeoutId = 0
        } else {
            el[INSTANCENAME].$props.trigger = true;
            el.classList.add("popover-show");

        }
    });
    el.addEventListener('mouseleave', function () {
        el[INSTANCENAME].$data.timeoutId = setTimeout(() => {
            el["popover_instance"].$data.timeoutId = 0
            el[INSTANCENAME].$props.trigger = false;
            el.classList.remove("popover-show");
        }, HIDETIMEOUT)
    });
}

function removeEvents(el) {
    el.removeEventListener('mouseenter', null);
    el.removeEventListener('mouseleave', null);
}
