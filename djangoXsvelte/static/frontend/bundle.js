
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign$1(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign$1($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_custom_element_data(node, prop, value) {
        if (prop in node) {
            node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
        }
        else {
            attr(node, prop, value);
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    /**
     * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
     * Event dispatchers are functions that can take two arguments: `name` and `detail`.
     *
     * Component events created with `createEventDispatcher` create a
     * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
     * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
     * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
     * property and can contain any type of data.
     *
     * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
     */
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }
    /**
     * Associates an arbitrary `context` object with the current component and the specified `key`
     * and returns that object. The context is then available to children of the component
     * (including slotted content) with `getContext`.
     *
     * Like lifecycle functions, this must be called during component initialisation.
     *
     * https://svelte.dev/docs#run-time-svelte-setcontext
     */
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
        return context;
    }
    /**
     * Retrieves the context that belongs to the closest parent component with the specified `key`.
     * Must be called during component initialisation.
     *
     * https://svelte.dev/docs#run-time-svelte-getcontext
     */
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init$1(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.55.1' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /*! js-cookie v3.0.1 | MIT */
    /* eslint-disable no-var */
    function assign (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          target[key] = source[key];
        }
      }
      return target
    }
    /* eslint-enable no-var */

    /* eslint-disable no-var */
    var defaultConverter = {
      read: function (value) {
        if (value[0] === '"') {
          value = value.slice(1, -1);
        }
        return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
      },
      write: function (value) {
        return encodeURIComponent(value).replace(
          /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
          decodeURIComponent
        )
      }
    };
    /* eslint-enable no-var */

    /* eslint-disable no-var */

    function init (converter, defaultAttributes) {
      function set (key, value, attributes) {
        if (typeof document === 'undefined') {
          return
        }

        attributes = assign({}, defaultAttributes, attributes);

        if (typeof attributes.expires === 'number') {
          attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
        }
        if (attributes.expires) {
          attributes.expires = attributes.expires.toUTCString();
        }

        key = encodeURIComponent(key)
          .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
          .replace(/[()]/g, escape);

        var stringifiedAttributes = '';
        for (var attributeName in attributes) {
          if (!attributes[attributeName]) {
            continue
          }

          stringifiedAttributes += '; ' + attributeName;

          if (attributes[attributeName] === true) {
            continue
          }

          // Considers RFC 6265 section 5.2:
          // ...
          // 3.  If the remaining unparsed-attributes contains a %x3B (";")
          //     character:
          // Consume the characters of the unparsed-attributes up to,
          // not including, the first %x3B (";") character.
          // ...
          stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
        }

        return (document.cookie =
          key + '=' + converter.write(value, key) + stringifiedAttributes)
      }

      function get (key) {
        if (typeof document === 'undefined' || (arguments.length && !key)) {
          return
        }

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all.
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        var jar = {};
        for (var i = 0; i < cookies.length; i++) {
          var parts = cookies[i].split('=');
          var value = parts.slice(1).join('=');

          try {
            var foundKey = decodeURIComponent(parts[0]);
            jar[foundKey] = converter.read(value, foundKey);

            if (key === foundKey) {
              break
            }
          } catch (e) {}
        }

        return key ? jar[key] : jar
      }

      return Object.create(
        {
          set: set,
          get: get,
          remove: function (key, attributes) {
            set(
              key,
              '',
              assign({}, attributes, {
                expires: -1
              })
            );
          },
          withAttributes: function (attributes) {
            return init(this.converter, assign({}, this.attributes, attributes))
          },
          withConverter: function (converter) {
            return init(assign({}, this.converter, converter), this.attributes)
          }
        },
        {
          attributes: { value: Object.freeze(defaultAttributes) },
          converter: { value: Object.freeze(converter) }
        }
      )
    }

    var api = init(defaultConverter, { path: '/' });

    /* src\lib\Button.svelte generated by Svelte v3.55.1 */

    const file$3 = "src\\lib\\Button.svelte";

    function create_fragment$3(ctx) {
    	let sl_button;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			sl_button = element("sl-button");
    			if (default_slot) default_slot.c();
    			set_custom_element_data(sl_button, "type", /*type*/ ctx[1]);
    			set_custom_element_data(sl_button, "class", /*classType*/ ctx[0]);
    			set_custom_element_data(sl_button, "variant", "primary");
    			add_location(sl_button, file$3, 8, 0, 161);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, sl_button, anchor);

    			if (default_slot) {
    				default_slot.m(sl_button, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(sl_button, "click", /*click_handler*/ ctx[4], false, false, false),
    					listen_dev(sl_button, "keydown", /*keydown_handler*/ ctx[5], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*type*/ 2) {
    				set_custom_element_data(sl_button, "type", /*type*/ ctx[1]);
    			}

    			if (!current || dirty & /*classType*/ 1) {
    				set_custom_element_data(sl_button, "class", /*classType*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(sl_button);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Button', slots, ['default']);
    	let { classType = 'form-control' } = $$props;
    	let { type = "submit" } = $$props;
    	const writable_props = ['classType', 'type'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Button> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('classType' in $$props) $$invalidate(0, classType = $$props.classType);
    		if ('type' in $$props) $$invalidate(1, type = $$props.type);
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ classType, type });

    	$$self.$inject_state = $$props => {
    		if ('classType' in $$props) $$invalidate(0, classType = $$props.classType);
    		if ('type' in $$props) $$invalidate(1, type = $$props.type);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [classType, type, $$scope, slots, click_handler, keydown_handler];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$3, create_fragment$3, safe_not_equal, { classType: 0, type: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get classType() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set classType(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    // Unique ID creation requires a high quality random # generator. In the browser we therefore
    // require the crypto API and do not support built-in fallback to lower quality random number
    // generators (like Math.random()).
    let getRandomValues;
    const rnds8 = new Uint8Array(16);
    function rng() {
      // lazy load so that environments that need to polyfill have a chance to do so
      if (!getRandomValues) {
        // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
        getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

        if (!getRandomValues) {
          throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
      }

      return getRandomValues(rnds8);
    }

    /**
     * Convert array of 16 byte values to UUID string format of the form:
     * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
     */

    const byteToHex = [];

    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 0x100).toString(16).slice(1));
    }

    function unsafeStringify(arr, offset = 0) {
      // Note: Be careful editing this code!  It's been tuned for performance
      // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
      return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
    }

    const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
    var native = {
      randomUUID
    };

    function v4(options, buf, offset) {
      if (native.randomUUID && !buf && !options) {
        return native.randomUUID();
      }

      options = options || {};
      const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

      rnds[6] = rnds[6] & 0x0f | 0x40;
      rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

      if (buf) {
        offset = offset || 0;

        for (let i = 0; i < 16; ++i) {
          buf[offset + i] = rnds[i];
        }

        return buf;
      }

      return unsafeStringify(rnds);
    }

    const formKey = Symbol();

    /* src\lib\Form\Field.svelte generated by Svelte v3.55.1 */

    const file$2 = "src\\lib\\Form\\Field.svelte";

    function create_fragment$2(ctx) {
    	let sl_input;
    	let t;
    	let span;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			sl_input = element("sl-input");
    			t = text("test \r\n   ");
    			span = element("span");
    			set_custom_element_data(sl_input, "class", "my-1");
    			set_custom_element_data(sl_input, "type", /*type*/ ctx[3]);
    			set_custom_element_data(sl_input, "min", /*min*/ ctx[1]);
    			set_custom_element_data(sl_input, "placeholder", /*placeholder*/ ctx[2]);
    			set_custom_element_data(sl_input, "id", /*id*/ ctx[4]);
    			set_custom_element_data(sl_input, "name", /*name*/ ctx[5]);
    			add_location(sl_input, file$2, 20, 4, 577);
    			attr_dev(span, "class", "focus-border");
    			add_location(span, file$2, 29, 14, 813);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, sl_input, anchor);
    			append_dev(sl_input, t);
    			/*sl_input_binding*/ ctx[7](sl_input);
    			insert_dev(target, span, anchor);

    			if (!mounted) {
    				dispose = listen_dev(sl_input, "input", /*input_handler*/ ctx[8], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*type*/ 8) {
    				set_custom_element_data(sl_input, "type", /*type*/ ctx[3]);
    			}

    			if (dirty & /*min*/ 2) {
    				set_custom_element_data(sl_input, "min", /*min*/ ctx[1]);
    			}

    			if (dirty & /*placeholder*/ 4) {
    				set_custom_element_data(sl_input, "placeholder", /*placeholder*/ ctx[2]);
    			}

    			if (dirty & /*id*/ 16) {
    				set_custom_element_data(sl_input, "id", /*id*/ ctx[4]);
    			}

    			if (dirty & /*name*/ 32) {
    				set_custom_element_data(sl_input, "name", /*name*/ ctx[5]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(sl_input);
    			/*sl_input_binding*/ ctx[7](null);
    			if (detaching) detach_dev(span);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Field', slots, []);
    	let { value } = $$props;
    	let { min = undefined } = $$props;
    	let { placeholder = "Entrez votre valeur" } = $$props;
    	let { type = "text" } = $$props;
    	let { id = v4() } = $$props;
    	let { name = id } = $$props;
    	let form = getContext(formKey);

    	function handleInput(e) {
    		const newValue = e.target.value;

    		form.update(f => ({
    			...f,
    			values: { ...f.values, [id]: newValue }
    		}));
    	}

    	$$self.$$.on_mount.push(function () {
    		if (value === undefined && !('value' in $$props || $$self.$$.bound[$$self.$$.props['value']])) {
    			console.warn("<Field> was created without expected prop 'value'");
    		}
    	});

    	const writable_props = ['value', 'min', 'placeholder', 'type', 'id', 'name'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Field> was created with unknown prop '${key}'`);
    	});

    	function sl_input_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			value = $$value;
    			$$invalidate(0, value);
    		});
    	}

    	const input_handler = e => {
    		handleInput(e);
    	};

    	$$self.$$set = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('min' in $$props) $$invalidate(1, min = $$props.min);
    		if ('placeholder' in $$props) $$invalidate(2, placeholder = $$props.placeholder);
    		if ('type' in $$props) $$invalidate(3, type = $$props.type);
    		if ('id' in $$props) $$invalidate(4, id = $$props.id);
    		if ('name' in $$props) $$invalidate(5, name = $$props.name);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		uuidv4: v4,
    		value,
    		min,
    		placeholder,
    		type,
    		id,
    		name,
    		formKey,
    		form,
    		handleInput
    	});

    	$$self.$inject_state = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('min' in $$props) $$invalidate(1, min = $$props.min);
    		if ('placeholder' in $$props) $$invalidate(2, placeholder = $$props.placeholder);
    		if ('type' in $$props) $$invalidate(3, type = $$props.type);
    		if ('id' in $$props) $$invalidate(4, id = $$props.id);
    		if ('name' in $$props) $$invalidate(5, name = $$props.name);
    		if ('form' in $$props) form = $$props.form;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		value,
    		min,
    		placeholder,
    		type,
    		id,
    		name,
    		handleInput,
    		sl_input_binding,
    		input_handler
    	];
    }

    class Field extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			value: 0,
    			min: 1,
    			placeholder: 2,
    			type: 3,
    			id: 4,
    			name: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Field",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get value() {
    		throw new Error("<Field>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Field>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get min() {
    		throw new Error("<Field>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set min(value) {
    		throw new Error("<Field>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placeholder() {
    		throw new Error("<Field>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<Field>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Field>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Field>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Field>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Field>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Field>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Field>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    /* src\lib\Form\Form.svelte generated by Svelte v3.55.1 */
    const file$1 = "src\\lib\\Form\\Form.svelte";

    function create_fragment$1(ctx) {
    	let form_1;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			form_1 = element("form");
    			if (default_slot) default_slot.c();
    			attr_dev(form_1, "class", "input-validation-required");
    			attr_dev(form_1, "action", "");
    			add_location(form_1, file$1, 28, 0, 556);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, form_1, anchor);

    			if (default_slot) {
    				default_slot.m(form_1, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(form_1, "changeFormValues", /*changeFormValues_handler*/ ctx[6], false, false, false),
    					listen_dev(form_1, "submit", prevent_default(/*submit_handler*/ ctx[7]), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(form_1);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $form,
    		$$unsubscribe_form = noop,
    		$$subscribe_form = () => ($$unsubscribe_form(), $$unsubscribe_form = subscribe(form, $$value => $$invalidate(3, $form = $$value)), form);

    	$$self.$$.on_destroy.push(() => $$unsubscribe_form());
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Form', slots, ['default']);
    	let { initialValues = {} } = $$props;
    	const form = writable({ values: initialValues, errors: {} });
    	validate_store(form, 'form');
    	$$subscribe_form();
    	const dispatch = createEventDispatcher();
    	setContext(formKey, form);

    	function handleSubmit(event) {
    		event.preventDefault();
    		dispatch('submit', { values: $form.values });
    	}

    	const writable_props = ['initialValues'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Form> was created with unknown prop '${key}'`);
    	});

    	function changeFormValues_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	const submit_handler = () => {
    	};

    	$$self.$$set = $$props => {
    		if ('initialValues' in $$props) $$invalidate(2, initialValues = $$props.initialValues);
    		if ('$$scope' in $$props) $$invalidate(4, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		writable,
    		setContext,
    		createEventDispatcher,
    		initialValues,
    		form,
    		formKey,
    		dispatch,
    		handleSubmit,
    		$form
    	});

    	$$self.$inject_state = $$props => {
    		if ('initialValues' in $$props) $$invalidate(2, initialValues = $$props.initialValues);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$form*/ 8) {
    			{
    				dispatch('changeFormValues', { values: $form.values });
    			}
    		}
    	};

    	return [
    		form,
    		handleSubmit,
    		initialValues,
    		$form,
    		$$scope,
    		slots,
    		changeFormValues_handler,
    		submit_handler
    	];
    }

    class Form extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$1, create_fragment$1, safe_not_equal, { initialValues: 2, form: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Form",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get initialValues() {
    		throw new Error("<Form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set initialValues(value) {
    		throw new Error("<Form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get form() {
    		return this.$$.ctx[0];
    	}

    	set form(value) {
    		throw new Error("<Form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\App.svelte generated by Svelte v3.55.1 */

    const { console: console_1 } = globals;

    const file = "src\\App.svelte";

    // (59:12) <Form class="col-12 col-md-7 p-5 bg-white rounded-3" on:changeFormValues={calculEventHandler} bind:el={test} id="calculate">
    function create_default_slot_2(ctx) {
    	let div1;
    	let div0;
    	let h1;
    	let t1;
    	let p;
    	let t3;
    	let hr;
    	let t4;
    	let div4;
    	let div2;
    	let span0;
    	let t6;
    	let span1;
    	let t8;
    	let div3;
    	let field0;
    	let t9;
    	let div7;
    	let div5;
    	let span2;
    	let t11;
    	let span3;
    	let t13;
    	let div6;
    	let field1;
    	let t14;
    	let div10;
    	let div8;
    	let span4;
    	let t16;
    	let span5;
    	let t18;
    	let div9;
    	let field2;
    	let t19;
    	let div13;
    	let div11;
    	let span6;
    	let t21;
    	let span7;
    	let t23;
    	let div12;
    	let field3;
    	let current;

    	field0 = new Field({
    			props: {
    				id: "averageBasket",
    				type: "number",
    				placeholder: "Panier moyen (€)",
    				min: "100"
    			},
    			$$inline: true
    		});

    	field1 = new Field({
    			props: {
    				type: "number",
    				id: "users",
    				placeholder: "Nombre d'utilisateurs",
    				min: "1"
    			},
    			$$inline: true
    		});

    	field2 = new Field({
    			props: {
    				type: "number",
    				id: "agencys",
    				placeholder: "Nombre d'agences",
    				min: "1"
    			},
    			$$inline: true
    		});

    	field3 = new Field({
    			props: {
    				type: "number",
    				id: "reward",
    				placeholder: "Récompense par lead concrétisé (€)",
    				min: "1"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Estimez vos gains avec Yuccan Lead !";
    			t1 = space();
    			p = element("p");
    			p.textContent = "Vous voulez savoir combien vous pouvez gagner grâce à Yuccan Lead ? Utilisez notre calculateur de tarif pour avoir une idée globale de la rentabilité de votre campagne de parrainage digital. Cet outil simple et efficace vous permettra de maximiser votre retour sur investissement.";
    			t3 = space();
    			hr = element("hr");
    			t4 = space();
    			div4 = element("div");
    			div2 = element("div");
    			span0 = element("span");
    			span0.textContent = "Votre panier moyen";
    			t6 = space();
    			span1 = element("span");
    			span1.textContent = "um animi voluptatibus et saepe dicta qui nisi velit est nobis sint ab perspiciatis maxime non assumenda fuga";
    			t8 = space();
    			div3 = element("div");
    			create_component(field0.$$.fragment);
    			t9 = space();
    			div7 = element("div");
    			div5 = element("div");
    			span2 = element("span");
    			span2.textContent = "Nombre d'utilisateurs";
    			t11 = space();
    			span3 = element("span");
    			span3.textContent = "um animi voluptatibus et saepe dicta qui nisi velit est nobis sint ab perspiciatis maxime non assumenda fuga";
    			t13 = space();
    			div6 = element("div");
    			create_component(field1.$$.fragment);
    			t14 = space();
    			div10 = element("div");
    			div8 = element("div");
    			span4 = element("span");
    			span4.textContent = "Nombre d'agences ou point de vente";
    			t16 = space();
    			span5 = element("span");
    			span5.textContent = "um animi voluptatibus et saepe dicta qui nisi velit est nobis sint ab perspiciatis maxime non assumenda fuga";
    			t18 = space();
    			div9 = element("div");
    			create_component(field2.$$.fragment);
    			t19 = space();
    			div13 = element("div");
    			div11 = element("div");
    			span6 = element("span");
    			span6.textContent = "Récompense par lead concrétisé (€)";
    			t21 = space();
    			span7 = element("span");
    			span7.textContent = "um animi voluptatibus et saepe dicta qui nisi velit est nobis sint ab perspiciatis maxime non assumenda fuga";
    			t23 = space();
    			div12 = element("div");
    			create_component(field3.$$.fragment);
    			attr_dev(h1, "class", "primary svelte-1gduusx");
    			add_location(h1, file, 61, 24, 1851);
    			attr_dev(p, "class", "lead");
    			add_location(p, file, 62, 24, 1937);
    			attr_dev(div0, "class", "col-12 ");
    			add_location(div0, file, 60, 20, 1805);
    			attr_dev(div1, "class", "row align-items-center mb-4");
    			add_location(div1, file, 59, 16, 1743);
    			attr_dev(hr, "class", "mt-4 mb-5 svelte-1gduusx");
    			add_location(hr, file, 67, 16, 2358);
    			attr_dev(span0, "class", "h5");
    			add_location(span0, file, 70, 24, 2515);
    			attr_dev(span1, "class", "text-muted ms-2");
    			add_location(span1, file, 71, 24, 2582);
    			attr_dev(div2, "class", "col-12 col-xxl-7");
    			add_location(div2, file, 69, 20, 2460);
    			attr_dev(div3, "class", "col-12 col-xxl-5 ");
    			add_location(div3, file, 73, 20, 2775);
    			attr_dev(div4, "class", "row align-items-center mb-5");
    			add_location(div4, file, 68, 16, 2398);
    			attr_dev(span2, "class", "h5");
    			add_location(span2, file, 79, 24, 3103);
    			attr_dev(span3, "class", "text-muted ms-2");
    			add_location(span3, file, 80, 24, 3173);
    			attr_dev(div5, "class", "col-12 col-xxl-7");
    			add_location(div5, file, 78, 20, 3048);
    			attr_dev(div6, "class", "col-12 col-xxl-5 ");
    			add_location(div6, file, 82, 20, 3366);
    			attr_dev(div7, "class", "row align-items-center mb-5");
    			add_location(div7, file, 77, 16, 2986);
    			attr_dev(span4, "class", "h5");
    			add_location(span4, file, 88, 24, 3688);
    			attr_dev(span5, "class", "text-muted ms-2");
    			add_location(span5, file, 89, 24, 3771);
    			attr_dev(div8, "class", "col-12 col-xxl-7");
    			add_location(div8, file, 87, 20, 3633);
    			attr_dev(div9, "class", "col-12 col-xxl-5 ");
    			add_location(div9, file, 91, 20, 3964);
    			attr_dev(div10, "class", "row align-items-center mb-5");
    			add_location(div10, file, 86, 16, 3571);
    			attr_dev(span6, "class", "h5");
    			add_location(span6, file, 97, 24, 4283);
    			attr_dev(span7, "class", "text-muted ms-2");
    			add_location(span7, file, 98, 24, 4366);
    			attr_dev(div11, "class", "col-12 col-xxl-7");
    			add_location(div11, file, 96, 20, 4228);
    			attr_dev(div12, "class", "col-12 col-xxl-5 ");
    			add_location(div12, file, 100, 20, 4559);
    			attr_dev(div13, "class", "row align-items-center mb-5");
    			add_location(div13, file, 95, 16, 4166);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h1);
    			append_dev(div0, t1);
    			append_dev(div0, p);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, hr, anchor);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div2);
    			append_dev(div2, span0);
    			append_dev(div2, t6);
    			append_dev(div2, span1);
    			append_dev(div4, t8);
    			append_dev(div4, div3);
    			mount_component(field0, div3, null);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, div7, anchor);
    			append_dev(div7, div5);
    			append_dev(div5, span2);
    			append_dev(div5, t11);
    			append_dev(div5, span3);
    			append_dev(div7, t13);
    			append_dev(div7, div6);
    			mount_component(field1, div6, null);
    			insert_dev(target, t14, anchor);
    			insert_dev(target, div10, anchor);
    			append_dev(div10, div8);
    			append_dev(div8, span4);
    			append_dev(div8, t16);
    			append_dev(div8, span5);
    			append_dev(div10, t18);
    			append_dev(div10, div9);
    			mount_component(field2, div9, null);
    			insert_dev(target, t19, anchor);
    			insert_dev(target, div13, anchor);
    			append_dev(div13, div11);
    			append_dev(div11, span6);
    			append_dev(div11, t21);
    			append_dev(div11, span7);
    			append_dev(div13, t23);
    			append_dev(div13, div12);
    			mount_component(field3, div12, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(field0.$$.fragment, local);
    			transition_in(field1.$$.fragment, local);
    			transition_in(field2.$$.fragment, local);
    			transition_in(field3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(field0.$$.fragment, local);
    			transition_out(field1.$$.fragment, local);
    			transition_out(field2.$$.fragment, local);
    			transition_out(field3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(hr);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div4);
    			destroy_component(field0);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(div7);
    			destroy_component(field1);
    			if (detaching) detach_dev(t14);
    			if (detaching) detach_dev(div10);
    			destroy_component(field2);
    			if (detaching) detach_dev(t19);
    			if (detaching) detach_dev(div13);
    			destroy_component(field3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(59:12) <Form class=\\\"col-12 col-md-7 p-5 bg-white rounded-3\\\" on:changeFormValues={calculEventHandler} bind:el={test} id=\\\"calculate\\\">",
    		ctx
    	});

    	return block;
    }

    // (135:24) <Button type="submit"                             classType=" h-100 w-100 rounded-3 h3 fw-bolder">
    function create_default_slot_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Envoyer");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(135:24) <Button type=\\\"submit\\\"                             classType=\\\" h-100 w-100 rounded-3 h3 fw-bolder\\\">",
    		ctx
    	});

    	return block;
    }

    // (115:16) <Form class=" pt-3">
    function create_default_slot(ctx) {
    	let div6;
    	let div2;
    	let div0;
    	let field0;
    	let t0;
    	let div1;
    	let field1;
    	let t1;
    	let div5;
    	let div3;
    	let field2;
    	let t2;
    	let div4;
    	let field3;
    	let t3;
    	let div7;
    	let button;
    	let current;

    	field0 = new Field({
    			props: { placeholder: "Nom" },
    			$$inline: true
    		});

    	field1 = new Field({
    			props: { placeholder: "Prénom" },
    			$$inline: true
    		});

    	field2 = new Field({
    			props: { placeholder: "Adresse mail" },
    			$$inline: true
    		});

    	field3 = new Field({
    			props: { placeholder: "Téléphone" },
    			$$inline: true
    		});

    	button = new Button({
    			props: {
    				type: "submit",
    				classType: " h-100 w-100 rounded-3 h3 fw-bolder",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			create_component(field0.$$.fragment);
    			t0 = space();
    			div1 = element("div");
    			create_component(field1.$$.fragment);
    			t1 = space();
    			div5 = element("div");
    			div3 = element("div");
    			create_component(field2.$$.fragment);
    			t2 = space();
    			div4 = element("div");
    			create_component(field3.$$.fragment);
    			t3 = space();
    			div7 = element("div");
    			create_component(button.$$.fragment);
    			attr_dev(div0, "class", "col-12 col-xl-6 ");
    			add_location(div0, file, 117, 28, 5429);
    			attr_dev(div1, "class", "col-12 col-xl-6 ");
    			add_location(div1, file, 120, 28, 5590);
    			attr_dev(div2, "class", "row ");
    			add_location(div2, file, 116, 24, 5382);
    			attr_dev(div3, "class", "col-12 col-xl-6 ");
    			add_location(div3, file, 125, 28, 5832);
    			attr_dev(div4, "class", "col-12 col-xl-6 ");
    			add_location(div4, file, 128, 28, 6002);
    			attr_dev(div5, "class", "row pt-3");
    			add_location(div5, file, 124, 24, 5781);
    			attr_dev(div6, "class", "col-12 ");
    			add_location(div6, file, 115, 20, 5336);
    			attr_dev(div7, "class", "col-3");
    			add_location(div7, file, 133, 20, 6219);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div2);
    			append_dev(div2, div0);
    			mount_component(field0, div0, null);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			mount_component(field1, div1, null);
    			append_dev(div6, t1);
    			append_dev(div6, div5);
    			append_dev(div5, div3);
    			mount_component(field2, div3, null);
    			append_dev(div5, t2);
    			append_dev(div5, div4);
    			mount_component(field3, div4, null);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div7, anchor);
    			mount_component(button, div7, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(field0.$$.fragment, local);
    			transition_in(field1.$$.fragment, local);
    			transition_in(field2.$$.fragment, local);
    			transition_in(field3.$$.fragment, local);
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(field0.$$.fragment, local);
    			transition_out(field1.$$.fragment, local);
    			transition_out(field2.$$.fragment, local);
    			transition_out(field3.$$.fragment, local);
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
    			destroy_component(field0);
    			destroy_component(field1);
    			destroy_component(field2);
    			destroy_component(field3);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div7);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(115:16) <Form class=\\\" pt-3\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let div0;
    	let form0;
    	let updating_el;
    	let t0;
    	let div2;
    	let div1;
    	let h1;
    	let i;
    	let t1;
    	let t2;
    	let p;
    	let t4;
    	let form1;
    	let current;

    	function form0_el_binding(value) {
    		/*form0_el_binding*/ ctx[2](value);
    	}

    	let form0_props = {
    		class: "col-12 col-md-7 p-5 bg-white rounded-3",
    		id: "calculate",
    		$$slots: { default: [create_default_slot_2] },
    		$$scope: { ctx }
    	};

    	if (/*test*/ ctx[0] !== void 0) {
    		form0_props.el = /*test*/ ctx[0];
    	}

    	form0 = new Form({ props: form0_props, $$inline: true });
    	binding_callbacks.push(() => bind(form0, 'el', form0_el_binding));
    	form0.$on("changeFormValues", /*calculEventHandler*/ ctx[1]);

    	form1 = new Form({
    			props: {
    				class: " pt-3",
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			div0 = element("div");
    			create_component(form0.$$.fragment);
    			t0 = space();
    			div2 = element("div");
    			div1 = element("div");
    			h1 = element("h1");
    			i = element("i");
    			t1 = text(" Plus d'informations ?");
    			t2 = space();
    			p = element("p");
    			p.textContent = "Vous souhaitez un diagnostique complet ? Contactez-nous pour en savoir plus sur notre solution de parrainage digital.";
    			t4 = space();
    			create_component(form1.$$.fragment);
    			attr_dev(div0, "class", "row justify-content-center align-items-center");
    			add_location(div0, file, 57, 8, 1530);
    			attr_dev(i, "class", "fa-solid fa-paper-plane secondary-2");
    			add_location(i, file, 109, 20, 4985);
    			attr_dev(h1, "class", "text-white svelte-1gduusx");
    			add_location(h1, file, 108, 16, 4941);
    			attr_dev(p, "class", "text-white");
    			add_location(p, file, 111, 16, 5097);
    			attr_dev(div1, "class", "col-12 p-5 bg-primary rounded-3");
    			add_location(div1, file, 107, 12, 4879);
    			attr_dev(div2, "class", "mt-2 justify-content-center align-items-center");
    			add_location(div2, file, 106, 8, 4805);
    			attr_dev(main, "class", "container-fluid");
    			add_location(main, file, 56, 0, 1491);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div0);
    			mount_component(form0, div0, null);
    			append_dev(main, t0);
    			append_dev(main, div2);
    			append_dev(div2, div1);
    			append_dev(div1, h1);
    			append_dev(h1, i);
    			append_dev(h1, t1);
    			append_dev(div1, t2);
    			append_dev(div1, p);
    			append_dev(div1, t4);
    			mount_component(form1, div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const form0_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				form0_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_el && dirty & /*test*/ 1) {
    				updating_el = true;
    				form0_changes.el = /*test*/ ctx[0];
    				add_flush_callback(() => updating_el = false);
    			}

    			form0.$set(form0_changes);
    			const form1_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				form1_changes.$$scope = { dirty, ctx };
    			}

    			form1.$set(form1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(form0.$$.fragment, local);
    			transition_in(form1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(form0.$$.fragment, local);
    			transition_out(form1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(form0);
    			destroy_component(form1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const csrfToken = api.get('csrftoken');

    	onMount(async () => {
    		let resp = await fetch("/api/greet").then(res => res.json());
    		resp.user_count;
    	});

    	let formCalcul = {};
    	let test;

    	function calculEventHandler(e) {
    		formCalcul = e.detail.values;
    		const requiredFields = ['averageBasket', 'agencys', 'reward', 'users']; //  les ids des champs requis
    		let isValid = true;

    		// vérifie si tous les champs requis ont été remplis
    		requiredFields.forEach(field => {
    			if (!formCalcul.hasOwnProperty(field) || formCalcul[field] === '') {
    				isValid = false;
    			}
    		});

    		if (isValid) {
    			postFormCalcul();
    		}
    	}

    	async function postFormCalcul(formCalcul) {
    		let form = test;
    		console.log(form);
    	} // let formData = new FormData(form);
    	// const response = await fetch('/api/greet', {

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function form0_el_binding(value) {
    		test = value;
    		$$invalidate(0, test);
    	}

    	$$self.$capture_state = () => ({
    		onMount,
    		Cookies: api,
    		Button,
    		Field,
    		Form,
    		csrfToken,
    		formCalcul,
    		test,
    		calculEventHandler,
    		postFormCalcul
    	});

    	$$self.$inject_state = $$props => {
    		if ('formCalcul' in $$props) formCalcul = $$props.formCalcul;
    		if ('test' in $$props) $$invalidate(0, test = $$props.test);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [test, calculEventHandler, form0_el_binding];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
