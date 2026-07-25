using System.ComponentModel.DataAnnotations;

namespace Saga.API.Models
{
    public class SagaData
    {
        public int SagaDataId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<Chapter> Chapters { get; set; } = new List<Chapter>();
        public int CompletionBonusPoints { get; set; }


    }


    public class Chapter
    {
        public int ChapterId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public int RewardPoints { get; set; }

        public int SagaDataId { get; set; }
        public SagaData Saga { get; set; } = null!;
        public List<Quest> Quests { get; set; } = new List<Quest>();


    }


    public class Quest
    {
        public int QuestId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string DocumentationLink { get; set; } = string.Empty;
        public string VideoLink { get; set; } = string.Empty;

        public int ChapterId { get; set; }
        public Chapter Chapter { get; set; } = null!;
    }



}

