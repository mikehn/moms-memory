import Avatar from 'components/Avatar'
import logo from 'assets/logo.svg'

function App() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="h-screen sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <div className="my-4">
              <Avatar size="large" src={logo} />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Moms memory site
            </h1>
            <p className="mt-4 text-xl text-gray-500">place holder</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
