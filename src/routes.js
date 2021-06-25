import Home from './routes/Home.svelte'
import Signup from './routes/Signup.svelte'
import Dashboard from './routes/Dashboard.svelte'

export default {
    '/': Signup,
    '/home/': Home,
    '/dashboard/': Dashboard,
}