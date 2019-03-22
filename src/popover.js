/**
 * v-popover directive
 * - this directive will create vu-popover component Instance programmatically
 * - looking for [data-name="popover-content"] to set the vu-popover component Slot (!important)
 * - events trigger binded (by now, only support 'hover', 'click', 'focus','contextmenu', default is 'hover')
 * - theme (white, blue, green, red, yellow, black)
 */
import Popover from './components/vu-popover.vue'
import Vue from 'vue'
const INSTANCENAME = 'popover_instance';
const HIDETIMEOUT = 500;
const EVENTS = {
    MOUSE_ENTER: 'mouseenter',
    MOUSE_LEAVE: 'mouseleave',
    FOCUS: 'focus',
    BLUR: 'blur',
    CLICK: 'click',
    CONTEXTMENU: 'contextmenu',
    // INPUT: 'input',
    // KEY_DOWN: 'keydown',
    // KEY_UP: 'keyup',
    // KEY_PRESS: 'keypress',
    // RESIZE: 'resize',
    // SCROLL: 'scroll',
    // TOUCH_START: 'touchstart',
    // TOUCH_END: 'touchend'
}

const TRIGGERS = {
    CLICK: 'click',
    HOVER: 'hover',
    FOCUS: 'focus',
    // HOVER_FOCUS: 'hover-focus',
    OUTSIDE_CLICK: 'outside-click',
    CONTEXTMENU: 'contextmenu',
    // MANUAL: 'manual'
}

const THEME = {
    WHITE: 'white',
    BLUE: 'blue',
    GREEN: 'green',
    RED: 'red',
    YELLOW: 'yellow',
    BLACK: 'black',
}

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
    if (popoverContentElm) {
        popoverContentElm.style.display = "none";
    }
    var vuPopover = Vue.extend(Popover);
    if (!binding.value || binding.value.isOpen === undefined) {
        binding.value.isOpen = false;
    }
    if (!binding.value || binding.value.trigger === undefined || Object.values(TRIGGERS).indexOf(binding.value.trigger) < 0) {
        binding.value.trigger = TRIGGERS.HOVER;
    }
    if (!binding.value || binding.value.theme === undefined || Object.values(THEME).indexOf(binding.value.theme) < 0) {
        binding.value.theme = THEME.WHITE;
    }
    var popoverInstance = new vuPopover({
        propsData: {
            target: el,
            title: binding.value && binding.value.title && binding.value.title.toString(),
            isOpen: binding.value && binding.value.isOpen,
            appendTo: binding.value && binding.value.appendTo,
            theme: binding.value && binding.value.theme,
        }
    });
    el[INSTANCENAME] = popoverInstance;
    const contentNode = vnode.children.find(child => child.data && child.data.attrs && child.data.attrs['data-name'] === "popover-content")
    popoverInstance.$slots.default = [contentNode];
    popoverInstance.$mount();
    el.appendChild(popoverInstance.$el);
    addEvents(el, binding);
}

function addEvents(el, binding) {
    var trigger = binding.value.trigger;
    if (trigger === TRIGGERS.HOVER) {
        el.addEventListener(EVENTS.MOUSE_ENTER, show.bind(el), true)
        el.addEventListener(EVENTS.MOUSE_LEAVE, hide.bind(el), true)
    } else if (trigger === TRIGGERS.FOCUS) {
        el.addEventListener(EVENTS.FOCUS, show.bind(el), true)
        el.addEventListener(EVENTS.BLUR, hide.bind(el), true)
    } else if (trigger === TRIGGERS.CLICK || trigger === TRIGGERS.OUTSIDE_CLICK) {
        el.addEventListener(EVENTS.CLICK, toggle.bind(el), true)
    } else if (trigger === TRIGGERS.CONTEXTMENU) {
        document.addEventListener(EVENTS.CONTEXTMENU, toggleContextMenu.bind(el), true)
        document.addEventListener(EVENTS.CLICK, hideContextMenu.bind(el), true)
    }
}

function removeEvents(el) {
    el.removeEventListener(EVENTS.MOUSE_ENTER, show);
    el.removeEventListener(EVENTS.MOUSE_LEAVE, hide);
    el.removeEventListener(EVENTS.FOCUS, show);
    el.removeEventListener(EVENTS.BLUR, hide);
    el.removeEventListener(EVENTS.CLICK, show);
    el.removeEventListener(EVENTS.CLICK, hide);
    document.removeEventListener(EVENTS.CONTEXTMENU, toggleContextMenu)
    document.removeEventListener(EVENTS.CLICK, hideContextMenu)
}

function show(e) {
    var el = this;
    e && e.stopPropagation();
    if (el[INSTANCENAME].$data.timeoutId > 0) {
        clearTimeout(el[INSTANCENAME].$data.timeoutId)
        el[INSTANCENAME].$data.timeoutId = 0
    } else {
        el[INSTANCENAME].$props.isOpen = true;
        el.classList.add("popover-show");
    }
}

function hide() {
    var el = this;
    //e && e.stopPropagation(); // for popover content event listen
    el[INSTANCENAME].$data.timeoutId = setTimeout(() => {
      if(el[INSTANCENAME].$data.timeoutId){
        el[INSTANCENAME].$props.isOpen = false;
        el.classList.remove("popover-show");
        el[INSTANCENAME].$data.timeoutId = 0
      }
    }, HIDETIMEOUT)
}

function toggle(e) {
    var el = this;
    var isShown = el[INSTANCENAME].$props.isOpen;
    if (isShown) {
        hide.bind(el)(e)
    } else {
        show.bind(el)(e)
    }
}

function toggleContextMenu(e) {
    var el = this;
    if (e) {
        e.stopPropagation();
        e.preventDefault();
    }
    if (el.contains(e.target)) {
      show.bind(el)(e)
    } else {
      hide.bind(el)(e)
    }
}

function hideContextMenu(e) {
//    e && e.stopPropagation(); // for popover content event listen
    var el = this;
    var popoverContainer = el.getElementsByClassName("popover-container")[0]
    if (e && e.target && popoverContainer && popoverContainer.contains(e.target)) {
        return;
    }
    hide.bind(el)(e)
}
