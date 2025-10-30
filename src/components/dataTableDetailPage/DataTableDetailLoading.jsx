import { Skeleton } from 'primereact/skeleton'
import React from 'react'

const DataTableDetailLoading = () => {
    return (
        <div className="flex gap-4">
            <Skeleton shape="circle" size="5rem" />
            <div className="flex flex-col gap-2">
              <Skeleton width="5rem" height="1.5rem" />
              <Skeleton width="7rem" height="1.5rem" />
              <Skeleton width="9rem" height="1.5rem" />
              <Skeleton width="10rem" height="1.5rem" />
            </div>
            <div className="flex flex-col gap-2">
            <Skeleton width="5rem" height="1.5rem" />
            <Skeleton width="7rem" height="1.5rem" />
            </div>    
          </div>
    )
}

export default DataTableDetailLoading