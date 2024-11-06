function App() {
  return (
    <>
      <div className="grid grid-cols-5">
        <div className="justify-items-center content-center col-span-3 bg-blue-800 p-4 w-full h-svh text-left">
          <h2 className="font-bold text-4xl">GoFinance</h2>
          <p className="my-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </p>
          <button className="my-2">Read More</button>
        </div>
        <div className="justify-items-center content-center col-span-2 bg-white p-4 w-full h-svh text-black text-left">
          <h3 className="font-bold text-4xl">Hello Again</h3>
          <p className="my-2">Welcome back</p>
          <div className="flex flex-col">
            <input type="email" className="bg-white my-2" placeholder="email" />
            <input
              type="password"
              className="bg-white my-2"
              placeholder="password"
            />
          </div>
          <div className="flex flex-col">
            <button className="my-2">Login</button>
            <button className="my-2">forgot password</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
