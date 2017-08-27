var Rate = Rate || (function () {
    var defaultSettings = {
        start: 0,
        max: 5,

        formInputName: undefined,

        filled: '★',
        empty: '☆',

        callback: undefined,
        invokeCallbackOnSetup: false
    }

    function invokeCallback(element, settings, value) {
        if (settings.callback) {
            settings.callback(element, value);
        }
    }

    function setVisualValue(rateContainer, value, settings) {
        for (var i = 0; i < rateContainer.childNodes.length; i++) {
            rateContainer.childNodes[i].innerText = i < value ? settings.filled : settings.empty;
        }
    }

    return {
        setup: function (rateContainer, settings) {
            settings = (function () {
                var actualSettings = {};
                Object.assign(actualSettings, defaultSettings, settings);
                return actualSettings;
            })();

            rateContainer.innerHTML = '';
            rateContainer.setAttribute('data-rate-value', settings.value);

            var formInput = (function () {
                if (settings.formInputName) {
                    formInput = document.createElement('input');
                    formInput.type = 'hidden';
                    formInput.name = settings.formInputName;
                    formInput.value = settings.start;

                    rateContainer.parentElement.appendChild(formInput);

                    return formInput;
                } else {
                    return;
                }
            })();

            for (var i = 0; i < settings.max; i++) {
                (function () {
                    var itemIndex = i;

                    var currentItem = document.createElement('span');
                    currentItem.classList.add('rate-item');

                    currentItem.addEventListener('mouseover', function () {
                        setVisualValue(rateContainer, itemIndex + 1, settings);
                    });

                    currentItem.addEventListener('mouseleave', function () {
                        setVisualValue(rateContainer, parseInt(rateContainer.getAttribute('data-rate-value')), settings);
                    });

                    currentItem.addEventListener('click', function () {
                        rateContainer.setAttribute('data-rate-value', itemIndex + 1);
                        setVisualValue(rateContainer, itemIndex + 1, settings);

                        if (formInput) {
                            formInput.value = itemIndex + 1;
                        }

                        invokeCallback(rateContainer, settings, itemIndex + 1);
                    });

                    rateContainer.appendChild(currentItem);
                })();
            }

            setVisualValue(rateContainer, settings.start, settings);

            if (settings.invokeCallbackOnSetup) {
                invokeCallback(rateContainer, settings, settings.start);
            }
        }
    };
})();
