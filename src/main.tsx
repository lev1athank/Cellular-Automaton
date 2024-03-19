import ReactDOM from 'react-dom/client'
import App from './App'
import "./../App/assets/style/global.css"
import { Provider } from 'react-redux'
import { Store } from './store/Store'
ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={Store}>
		<App />
	</Provider>
)
