import ListObjectsPayload from '../../../InterfaceAdapters/Payloads/FileSystem/ListObjectsPayload';
import FilesystemFactory from "../../../Infrastructure/Factories/FilesystemFactory";


class ListObjectsUseCase
{
    async handle(payload: ListObjectsPayload): Promise<any>
    {
        const filesystem = FilesystemFactory.create();
        return await filesystem.listObjects(payload.getPrefix(), payload.getRecursive());
    }
}

export default ListObjectsUseCase;