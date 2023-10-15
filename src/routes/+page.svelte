
<script>
    import { goto } from '$app/navigation';
    const handleButtonClick = () => {
    goto('/generalprojectinformation')
  };
</script>

  <p>This is the website for the bachelor thesis “Development of a web-application for cost-benefit analysis of HPC innovations” from the TU Munich. In the following, various questions are asked about the cost-benefit efficiency of your project to dynamic ressources on HPC Systems. Afterwards, you will receive a personal evaluation of your data and can thus assess the cost-benefit efficiency of your project. No data will be stored or collected.</p>
  <div class="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
  <button class="text-white px-20 btn btn-primary" style="font-size: 18px;" on:click={handleButtonClick}>
    Start Processing
  </button>
</div>

<style>
  p {
    margin-top: 10%;
    text-align: center;
    padding-left: 5%;
    padding-right: 5%;
    font-size: 18px;
  }
</style>
