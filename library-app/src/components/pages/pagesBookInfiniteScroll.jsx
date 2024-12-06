// import InfiniteScroll from "react-infinite-scroll-component";
// import { request } from "../../../axiosConfig";
// import { useInfiniteQuery } from "@tanstack/react-query";

// const PAGE_SIZE = 20; // Define page size constant

// const fetchDataFromApi = async ({pageParam}) => {
//     console.log('Fetching data for page:', pageParam);

//     const { data } = await request('get', '/Book', {
//         pageNumber: pageParam,
//         pageSize: PAGE_SIZE,
//         sortBy: 'Title',
//         sortOrder: true
//     });
//     return data;
// };

// const InfiniteScrollList = () => {

//     const { data, fetchNextPage } = useInfiniteQuery({

//         queryKey: ['books'],

//         queryFn: fetchDataFromApi,

//         initialPageParam: 1,

//         getNextPageParam: (lastPage, allPages) => {

//             if (!lastPage || lastPage.length < PAGE_SIZE) {

//                 return undefined;

//             }
//             return allPages.length + 1;
//         }

        

//     });

//     const items = data?.pages.flatMap(page => page) ?? [];
//     const isEmpty = items.length === 0;
//     const isReachingEnd = isEmpty || (data && data.pages[data.pages.length - 1].length < PAGE_SIZE);
//     return (

//         <div className="container mx-auto p-4">

//             <InfiniteScroll


//                 dataLength={items.length}

//                 next={fetchNextPage}

//                 hasMore={!isReachingEnd}

//                 endMessage={

//                     <div className="text-center p-4 text-gray-500">

//                         <p>✨ You have seen all items ✨</p>

//                         <p className="text-sm">Total items: {items.length}</p>

//                     </div>

//                 }

//             >

//                 {items.map((item, index) => (

//                     <div key={`${item.id || index}`}>

//                         <h3 className="text-lg font-medium"> {item.id} - {item.title}</h3>

//                         <p className="text-gray-600">{item.author}</p>

//                     </div>

//                 ))}

//             </InfiniteScroll>

//         </div>

//     );
// }

// export default InfiniteScrollList;