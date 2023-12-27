# KPI back-end labs
 ## Lab №3
 ### Variant

15 mod 3 = 0, 0 - Облік доходів
 
Щоб запустити проект, введіть наступні команди
```bash
git clone https://github.com/daleogont/backend_labs
cd backend_labs
docker-compose up --build
```
 Далі аби налагодити проект та базу даних - введіть наступне у двох нових терміналах:

```bash
sudo docker ps -a
sudo docker exec -it backend_project_3c_postgres_1 psql -U postgres
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```
```bash
sudo docker exec -it backend_project_3c_app_1 /bin/bash
npx sequelize-cli db:migrate
```
 
