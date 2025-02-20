'use client'
import React, { useEffect, useState } from 'react'

import Image, { ImageProps } from 'next/image'

interface AppImageProps extends ImageProps {
    className: string
    fallbackImage: string
    alt: string
    src: string
}

export const AppImage = (props: AppImageProps) => {
    const { className, fallbackImage, alt, src, ...otherProps } = props
    const [error, setError] = useState(false)

    useEffect(() => {
        setError(false)
    }, [src])

    return (
        <Image
            className={className}
            alt={alt}
            onError={() => {
                setError(true)
            }}
            src={error ? fallbackImage : src}
            {...otherProps}
        />
    )
}
