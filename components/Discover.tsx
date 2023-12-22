import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { topics } from '@/utils/constants';

const Discover = () => {
    const router = useRouter();
    const topic = router.query.topic;
    // const { topic } = router.query;
    

    const activeTopicStyle = 'xl:border-2 xl:border-[#f51997] hover:bg-primary px-3 py-2 rounded text-[#f51997] flex items-center justify-center gap-2';

    const topicStyle = 'xl:border-2 xl:border-gray hover:bg-primary px-3 py-2 rounded text-black flex items-center justify-center gap-2';

  return (
    <div className=''>
        <p className='text-gray-500 font-semibold m-3 mt-5 hidden xl:block'>Popular Topics</p>
        <div className='flex gap-3 flex-wrap'>
            {topics.map((item, i) => (
                <Link href={`/?topic=${item.name}`} key={i}>
                    <div className={topic === item.name ? activeTopicStyle : topicStyle}>
                        <span className='font-bold text-2xl xl:text-md'>
                            {item.icon}
                        </span>
                        <span className='font-medium text-md hidden xl:block capitalize'>{item.name}</span>
                    </div>
                </Link>
            ))}
        </div>     
    </div>
  )
}

export default Discover