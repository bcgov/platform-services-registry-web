import { PlusIcon } from "@heroicons/react/20/solid";

export default function Tabs() {
  return (
    <nav className="bg-white shadow">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 justify-between ">
          <div className="flex">
            <div className="md:ml-11 md:flex md:space-x-8">
              <a
                href="#"
                className="inline-flex items-center px-1 pt-1 font-bcsans text-xl font-bold text-bcblue"
              >
                <span className="relative">
                  PRIVATE CLOUD OPENSHIFT
                  <div className="absolute inset-x-0 mx-auto h-5 w-2/3 border-b-3 border-bcorange"></div>
                </span>
              </a>
              <a
                href="#"
                className="inline-flex items-center px-1 pt-1 font-bcsans text-xl font-bold text-deselected "
              >
                <span className="relative">
                  PUBLIC CLOUD LANDING ZONES
                  <div className="absolute inset-x-0 mx-auto h-5 w-2/3 border-b-4 border-transparent hover:border-gray-300"></div>
                </span>
              </a>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button
                type="button"
                className="text-md shadow-smx relative inline-flex items-center gap-x-1.5 rounded-lg bg-bcorange px-3 py-2 font-bcsans font-thin text-bcblue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                REQUEST A NEW PROJECT SET
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
