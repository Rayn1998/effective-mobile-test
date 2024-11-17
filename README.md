## 1е Задание тестового
Для использования необходимо скопировать репозиторий, использовать "npm i"
В папке проекта прилагается файл для insomnia  с прописанными запросами

Суть такая:
    - есть остаток (remainder), который содержит код продукта и массив с данными по количеству этого продукта в разных магазинах.
    - есть сам товар, который создаётся уже после того, как остаток с таким кодом имеется. Сущность товара включает такой же штрихкод, как и в имеющемся остатке, плюс название самого товара (апельсины, к примеру:P, Новый Год скоро), количество в полученном заказе для какого магазина. Есть ещё строчка с количеством этого товара на полке во всех магазинах, где есть товар с таким кодом.

Созданы все необходимые эндпоинты для создание, редактирования, получения и получение по фильтрации, что требовались по заданию

Использован express и mongo, на чистом JS
