import EnthusiasticGreeter from './greeter';

const greeter = new EnthusiasticGreeter();

const window = Ti.UI.createWindow({
  backgroundColor: '#fff',
  layout: 'vertical'
});

const header = Ti.UI.createView({
  layout: 'vertical',
  backgroundColor: '#294E80',
  height: 200
});
header.add(Ti.UI.createImageView({
  top: 60,
  height: 50,
  image: '/images/ts-logo.png'
}));
header.add(Ti.UI.createLabel({
  top: 20,
  color: '#fff'
}));
window.add(header);

const nameInput = Ti.UI.createTextField({
  top: 40,
  left: 20,
  hintText: 'Enter your name'
});
nameInput.addEventListener('change', e => {
  greetingLabel.text = greeter.sayHello(e.value);
});
window.add(nameInput);

const greetingLabel = Ti.UI.createLabel();
window.add(greetingLabel);

const containerView = Ti.UI.createView({
  layout: 'horizontal',
  top: 20,
  left: 20,
  right: 20
});
containerView.add(createButton('-', { right: 10 }, decrement));
containerView.add(createButton('+', { left: 10 }, increment));
window.add(containerView);

function createButton(title: string, options: any, callback: () => void) {
  const buttonWrapper = Ti.UI.createView({
    width: '50%',
    height: Ti.UI.SIZE
  });
  const buttonOptions = {};
  Object.assign(buttonOptions, {
    width: 100,
    backgroundColor: '#ddd',
    title
  }, options);
  const button = Ti.UI.createButton(buttonOptions);
  button.addEventListener('click', callback);
  buttonWrapper.add(button);

  return buttonWrapper;
}

function decrement(): void {
  greeter.decrement();
  updateGreeting(nameInput.value);
}

function increment(): void {
  greeter.increment();
  updateGreeting(nameInput.value);
}

function updateGreeting(name: string) {
  let greeting = '';
  if (name === '') {
    greeting = 'Please enter your name first!';
  } else {
    greeting = greeter.sayHello(name);
  }
  greetingLabel.text = greeting;
}

if (Ti.Platform.osname === 'android') {
  window.activity.onStart = () => {
    window.activity.actionBar.hide();
  };
}

window.open();
