# KPI back-end 
 
Щоб запустити проект, введіть наступні команди
```bash
git clone https://github.com/daleogont/backend_labs
cd backend_labs
docker-compose up --build
```
 Далі аби налагодити проект та базу даних - введіть наступне у двох нових терміналах:

```bash
sudo docker ps -a
sudo docker exec -it (назва вашої корневої діректорії)_postgres_1 psql -U postgres
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```
```bash
sudo docker exec -it (назва вашої корневої діректорії)_app_1 /bin/bash
npx sequelize-cli db:migrate
```
 
