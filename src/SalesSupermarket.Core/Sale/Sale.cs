using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesSupermarket.Core.Sale
{
    public class Sale
    {
        [Key]
        public int Id { get; set; }

        public int ClientId { get; set; }

        [Required]
        public DateTime SaleDate { get; set; }

        [Required]
        public int ProducId { get; set; }
    }
}
