import IFileRepository from './IFileRepository';
import { injectable } from 'inversify';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import Paginator from '../../../Shared/Infrastructure/Orm/MikroORMPaginator';
import FileFilter from '../../Presentation/Criterias/FileFilter';
import FileSchema from '../Schemas/FileMikroORM';
import File from '../../Domain/Entities/File';
import IFileDomain from '../../Domain/Entities/IFileDomain';

import BaseMikroORMRepository from '../../../Shared/Infrastructure/Repositories/BaseMikroORMRepository';

@injectable()
class FileMikroORMRepository extends BaseMikroORMRepository<IFileDomain> implements IFileRepository
{
    constructor()
    {
        super('File', FileSchema);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder = this.em.createQueryBuilder('File', 'i');

        const filter = criteria.getFilter();

        void queryBuilder.where('1 = 1');

        if (filter.has(FileFilter.NAME))
        {
            void queryBuilder.andWhere(`i.${  FileFilter.NAME  } like %?%`, [filter.get(FileFilter.NAME)]);
        }

        return new Paginator(queryBuilder, criteria);
    }
}

export default FileMikroORMRepository;
