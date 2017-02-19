import Tome from '@bjornstar/tomes';

const sessionAuthenticated = '';

const appState = Tome.conjure({ sessionAuthenticated });

appState.on('readable', appState.read);

export default appState;
