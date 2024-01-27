export default function Home() {
  return (
    <div className="flex">
        <div>
          <h1 className="text-6xl">Origin</h1>
          <div>
              <form className="flex flex-col gap-3">
                  <input type="text" placeholder="Search" className="border"/>
                  <input type="text" placeholder="enter date"/>
                  <input type="text" placeholder="enter location"/>
              </form>
          </div>
        </div>

        <div>
            {/* to be star chart image*/}
        </div>
    </div>
  );
}