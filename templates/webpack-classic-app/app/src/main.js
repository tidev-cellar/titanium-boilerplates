/**
 * This is Webpack's main entry point.
 */

/**
 * Create a new `Ti.UI.TabGroup`.
 */
const tabGroup = Ti.UI.createTabGroup();

/**
 * Add the two created tabs to the tabGroup object.
 */
tabGroup.addTab(createTab("Tab 1", "I am Window 1111", "images/tab1.png"));
tabGroup.addTab(createTab("Tab 2", "I am Window 2", "images/tab2.png"));



/**
 * Open the tabGroup
 */
tabGroup.open();

/**
 * Creates a new Tab and configures it.
 *
 * @param  {String} title The title used in the `Ti.UI.Tab` and it's included `Ti.UI.Window`
 * @param  {String} message The title displayed in the `Ti.UI.Label`
 * @param {String} icon The icon used in the `Ti.UI.Tab`
 */
function createTab(title, message, icon) {
	const win = Ti.UI.createWindow({
		title: title,
		backgroundColor: '#fff'
	});

	const label = Ti.UI.createLabel({
		text: message,
		color: "#333",
		font: {
			fontSize: 20
		}
	});

	win.add(label);

	const tab = Ti.UI.createTab({
		title: title,
		icon: icon,
		window: win
	});

	return tab;
}