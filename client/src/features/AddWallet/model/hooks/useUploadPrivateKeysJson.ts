import { useAddAddressesMutation } from '../api/walletsApi'

export const useUploadPrivateKeysJson = () => {
    const [addAddresses, { error }] = useAddAddressesMutation()

    const uploadKeys = (file: File) => {
        const reader = new FileReader()

        reader.onload = async (event) => {
            try {
                const json = JSON.parse(event.target?.result as string)

                let keys: string[] = []

                if (Array.isArray(json)) {
                    keys = json
                } else if (typeof json === 'object' && json !== null) {
                    keys = Object.values(json)
                } else {
                    throw new Error('Invalid JSON format')
                }

                await addAddresses({ privateKeys: keys })
            } catch (error) {
                console.error('Error processing file:', error)
            }
        }

        reader.readAsText(file)
    }

    return { uploadKeys, error }
}
