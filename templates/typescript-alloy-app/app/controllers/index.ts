import EnthusiasticGreeter from 'greeter';

const greeter = new EnthusiasticGreeter();

// Views accessed via ID require explicit type casting if you want type safety
const nameInput = $.name as Titanium.UI.TextField;
const greetingLabel = $.getView('greeting') as Titanium.UI.Label;
const window = $.getTopLevelViews()[0] as Titanium.UI.Window;

// Typed and documented controller methods are available as usual under $
$.addListener(nameInput, 'change', e => {
  greetingLabel.text = greeter.sayHello(e.value);
});

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

if (OS_ANDROID) {
  window.activity.onStart = () => {
    window.activity.actionBar.hide();
  };
}

window.open();
