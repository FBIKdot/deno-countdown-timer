/**
 * @description 根据目标日期生成倒计时页面
 * @param {string} targetDate 目标日期字符串 (格式: yyyy/mm/dd)
 * @return {string} 倒计时页面的 HTML
 */
function createCountdownPage(targetDate) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Countdown Timer</title>
      <style>
        body { 
          background-color: black; 
          color: white; 
          text-align: center; 
          font-family: Arial, sans-serif; 
          display: flex; 
          justify-content: center; 
          align-items: center; 
          height: 100vh; 
          margin: 0; 
        }
        #cTimer { 
          font-size: 2.5em; 
          text-align: center; 
        }
      </style>
    </head>
    <body>
      <div id="cTimer"></div>
      <script>
        const targetDate = new Date("${targetDate}");
        function updateTimer() {
          const now = new Date();
          const leftTime = targetDate - now;

          if (leftTime > 0) {
            const days = Math.floor(leftTime / (1000 * 60 * 60 * 24));
            const hours = Math.floor((leftTime / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((leftTime / (1000 * 60)) % 60);
            const seconds = Math.floor((leftTime / 1000) % 60);
            document.getElementById("cTimer").textContent = 
              \`\${days} 天 \${hours} 小时 \${minutes} 分钟 \${seconds} 秒\`;
          } else {
            document.getElementById("cTimer").textContent = "The countdown has ended.";
          }
        }
        setInterval(updateTimer, 1000);
        updateTimer();
      </script>
    </body>
    </html>`;
}

Deno.serve((req) => {
  const url = new URL(req.url);
  const targetDate = url.searchParams.get("date") || "2222/02/02"; // 默认日期

  const html = createCountdownPage(targetDate);
  return new Response(html, { status: 200, headers: { "Content-Type": "text/html" } });
});
