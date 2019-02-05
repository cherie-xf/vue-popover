import Popover from 'components/vu-popover.vue'
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
    if(binding.value && binding.value.trigger === undefined){
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
    var s = JSON.stringify
    el.innerHTML =
        'name: ' + s(binding.name) + '<br>' +
        'value: ' + s(binding.value) + '<br>' +
        'expression: ' + s(binding.expression) + '<br>' +
        'argument: ' + s(binding.arg) + '<br>' +
        'modifiers: ' + s(binding.modifiers) + '<br>' +
        'vnode keys: ' + Object.keys(vnode).join(', ');
    popoverInstance.$mount();
    addEvents(el, binding);
}

function addEvents(el, binding){
    el.addEventListener('mouseenter', function() {
        // el.style.border = "1px solid black";
        // el.style.color = binding.value.color;
        // el.style.backgroundColor = binding.value.backgroundColor;
        binding.value.trigger = true;
    });
    el.addEventListener('mouseleave', function() {
        binding.value.trigger = false;
    });
}

function removeEvents(el){
    el.removeEventListener('mouseenter');
    el.removeEventListener('mouseleave');
}
