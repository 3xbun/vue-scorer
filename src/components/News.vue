<template>
  <div id="News">
    <h1>
      บอร์ดประกาศ
    </h1>
    <div class="news">
      <ul>
        <div class="news-items">
          <li>ข่าว #1</li>
          <span class="date">3 วันที่แล้ว</span>
        </div>
        <div class="news-items">
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            similique dolore facere ut vel distinctio. Adipisci, officiis
            expedita? Quae nulla ratione ex facilis, aliquam saepe quidem minus
            labore laborum ullam!
          </li>
          <span class="date">1 วันที่แล้ว</span>
        </div>
        <div class="news-items">
          <li>ข่าว #1</li>
          <span class="date">ไม่กี่วินาที</span>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.news-items {
  background: var(--grey);
  margin: 1em auto;
  padding: 0.5em 1em;
  border-radius: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date {
  color: var(--light-grey);
  transform: scale(0.8);
  min-width: 100px;
  text-align: right;
}
</style>
