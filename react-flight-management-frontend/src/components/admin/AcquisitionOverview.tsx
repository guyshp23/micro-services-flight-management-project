import { Table } from "flowbite-react";


export default function AcquisitionOverview() {
    return (
      <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
        <h3 className="mb-6 text-xl font-bold leading-none text-gray-900 dark:text-white">
          Acquisition Overview
        </h3>
        <div className="flex flex-col">
          <div className="overflow-x-auto rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow sm:rounded-lg">
                <Table className="min-w-full table-fixed">
                  <Table.Head>
                    <Table.HeadCell className="whitespace-nowrap rounded-l border-x-0 bg-gray-50 py-3 px-4 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">
                      Top Channels
                    </Table.HeadCell>
                    <Table.HeadCell className="whitespace-nowrap border-x-0 bg-gray-50 py-3 px-4 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">
                      Users
                    </Table.HeadCell>
                    <Table.HeadCell className="min-w-[140px] whitespace-nowrap rounded-r border-x-0 bg-gray-50 py-3 px-4 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">
                      Acquisition
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y divide-gray-100 dark:divide-gray-700">
                    <Table.Row className="text-gray-500 dark:text-gray-400">
                      <Table.Cell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
                        Organic Search
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
                        5,649
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                        <div className="flex items-center">
                          <span className="mr-2 text-xs font-medium">30%</span>
                          <div className="relative w-full">
                            <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
                              <div
                                className="h-2 rounded-sm bg-gray-500"
                                style={{ width: "30%" }}
                              />
                            </div>
                          </div>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row className="text-gray-500 dark:text-gray-400">
                      <Table.Cell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
                        Referral
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
                        4,025
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                        <div className="flex items-center">
                          <span className="mr-2 text-xs font-medium">24%</span>
                          <div className="relative w-full">
                            <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
                              <div
                                className="h-2 rounded-sm bg-orange-300"
                                style={{ width: "24%" }}
                              />
                            </div>
                          </div>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row className="text-gray-500 dark:text-gray-400">
                      <Table.Cell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
                        Direct
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
                        3,105
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                        <div className="flex items-center">
                          <span className="mr-2 text-xs font-medium">18%</span>
                          <div className="relative w-full">
                            <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
                              <div
                                className="h-2 rounded-sm bg-teal-400"
                                style={{ width: "18%" }}
                              />
                            </div>
                          </div>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row className="text-gray-500 dark:text-gray-400">
                      <Table.Cell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
                        Social
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
                        1251
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                        <div className="flex items-center">
                          <span className="mr-2 text-xs font-medium">12%</span>
                          <div className="relative w-full">
                            <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
                              <div
                                className="h-2 rounded-sm bg-pink-600"
                                style={{ width: "12%" }}
                              />
                            </div>
                          </div>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row className="text-gray-500 dark:text-gray-400">
                      <Table.Cell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
                        Other
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
                        734
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                        <div className="flex items-center">
                          <span className="mr-2 text-xs font-medium">9%</span>
                          <div className="relative w-full">
                            <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
                              <div
                                className="h-2 rounded-sm bg-indigo-600"
                                style={{ width: "9%" }}
                              />
                            </div>
                          </div>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row className="text-gray-500 dark:text-gray-400">
                      <Table.Cell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
                        Email
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
                        456
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                        <div className="flex items-center">
                          <span className="mr-2 text-xs font-medium">7%</span>
                          <div className="relative w-full">
                            <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
                              <div
                                className="h-2 rounded-sm bg-purple-500"
                                style={{ width: "7%" }}
                              />
                            </div>
                          </div>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };