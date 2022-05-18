using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsSupermarket.Core.Promotion
{
    public class Promotion
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public double Discounts { get; set; }
    }
}
